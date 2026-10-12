// Génère docs/*.md depuis openapi.yaml : une page par tag, chaque opération avec un exemple curl
// et des exemples JSON tirés des schémas. Sert à l'indexation Context7 (qui exige des extraits de code).
// Usage : npm run docs:md
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const spec = yaml.load(fs.readFileSync('openapi.yaml', 'utf8'));
const BASE = 'https://app.ciklik.co/api/v3';
const OUT = 'docs';
const METHODS = ['get', 'post', 'put', 'patch', 'delete'];

function resolve(node, seen = new Set()) {
  if (!node || typeof node !== 'object' || !node.$ref) return node;
  if (seen.has(node.$ref)) return {};
  seen.add(node.$ref);
  const target = node.$ref.replace(/^#\//, '').split('/').reduce((acc, key) => acc?.[key], spec);
  return resolve(target, seen);
}

// Exemple construit depuis le schéma : example explicite d'abord, sinon une valeur plausible par type
function sample(schemaNode, depth = 0) {
  const schema = resolve(schemaNode);
  if (!schema || depth > 6) return null;
  if (schema.example !== undefined) return schema.example;
  if (schema.examples?.length) return schema.examples[0];
  if (schema.default !== undefined) return schema.default;
  if (schema.enum?.length) return schema.enum[0];
  for (const key of ['allOf']) {
    if (schema[key]) return Object.assign({}, ...schema[key].map((s) => sample(s, depth + 1)).filter((v) => v && typeof v === 'object'));
  }
  for (const key of ['oneOf', 'anyOf']) {
    if (schema[key]) return sample(schema[key].find((s) => resolve(s)?.type !== 'null') ?? schema[key][0], depth + 1);
  }
  const type = Array.isArray(schema.type) ? schema.type.find((t) => t !== 'null') : schema.type;
  if (type === 'object' || schema.properties) {
    const out = {};
    for (const [name, prop] of Object.entries(schema.properties ?? {})) out[name] = sample(prop, depth + 1);
    return out;
  }
  if (type === 'array') return [sample(schema.items, depth + 1)];
  if (type === 'integer') return 1;
  if (type === 'number') return 9.9;
  if (type === 'boolean') return true;
  if (type === 'string') {
    if (schema.format === 'date-time') return '2026-10-12T10:00:00+02:00';
    if (schema.format === 'date') return '2026-10-12';
    if (schema.format === 'email') return 'client@example.com';
    if (schema.format === 'uuid') return '3f2b8c1e-5d4a-4b7e-9c2f-1a2b3c4d5e6f';
    if (schema.format === 'uri') return 'https://example.com';
    return 'string';
  }
  return null;
}

function jsonBlock(value) {
  return '```json\n' + JSON.stringify(value, null, 2) + '\n```';
}

function curl(method, route, params, body) {
  const query = params.filter((p) => p.in === 'query' && p.required).map((p) => `${p.name}=${encodeURIComponent(String(sample(p.schema) ?? ''))}`);
  const url = BASE + route.replace(/\{(\w+)\}/g, (_, name) => {
    const value = sample(params.find((p) => p.name === name)?.schema);
    return value === null || value === 'string' ? `<${name}>` : String(value);
  }) + (query.length ? '?' + query.join('&') : '');
  const lines = [`curl -X ${method.toUpperCase()} "${url}"`, '  -H "Authorization: Bearer $CIKLIK_API_TOKEN"', '  -H "Accept: application/json"'];
  if (body !== undefined) {
    lines.push('  -H "Content-Type: application/json"');
    lines.push(`  -d '${JSON.stringify(body).replace(/'/g, "'\\''")}'`);
  }
  return '```bash\n' + lines.join(' \\\n') + '\n```';
}

function paramsTable(params) {
  if (!params.length) return '';
  const rows = params.map((p) => {
    const schema = resolve(p.schema) ?? {};
    const type = Array.isArray(schema.type) ? schema.type.join(' | ') : schema.type ?? '';
    return `| \`${p.name}\` | ${p.in} | ${type} | ${p.required ? 'oui' : 'non'} | ${(p.description ?? '').replace(/\n+/g, ' ').replace(/\|/g, '\\|')} |`;
  });
  return ['| Paramètre | Où | Type | Obligatoire | Description |', '|---|---|---|---|---|', ...rows].join('\n');
}

const byTag = new Map((spec.tags ?? []).map((t) => [t.name, { tag: t, ops: [] }]));
for (const [route, item] of Object.entries(spec.paths)) {
  const shared = (item.parameters ?? []).map(resolve);
  for (const method of METHODS) {
    const op = item[method];
    if (!op) continue;
    const tag = op.tags?.[0] ?? 'autres';
    if (!byTag.has(tag)) byTag.set(tag, { tag: { name: tag }, ops: [] });
    byTag.get(tag).ops.push({ route, method, op, params: [...shared, ...(op.parameters ?? []).map(resolve)] });
  }
}

fs.mkdirSync(OUT, { recursive: true });
const index = [`# ${spec.info.title}`, '', (spec.info.description ?? '').trim(), '', `Base : \`${BASE}\` (environnement de démonstration : \`https://demonstration.ciklik.co/api/v3\`).`, '', 'Authentification : en-tête `Authorization: Bearer <jeton>`, jeton fourni par Ciklik pour chaque site.', '', '```bash\ncurl https://app.ciklik.co/api/v3/whoiam \\\n  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \\\n  -H "Accept: application/json"\n```', '', '## Ressources', ''];

for (const { tag, ops } of byTag.values()) {
  if (!ops.length) continue;
  const file = `${tag.name}.md`;
  index.push(`- [${tag.name}](${file})${tag.description ? ' : ' + tag.description.split('\n')[0] : ''}`);
  const out = [`# ${tag.name}`, ''];
  if (tag.description) out.push(tag.description.trim(), '');
  for (const { route, method, op, params } of ops) {
    out.push(`## ${op.summary ?? `${method.toUpperCase()} ${route}`}`, '', `\`${method.toUpperCase()} ${route}\``, '');
    if (op.description) out.push(op.description.trim(), '');
    const table = paramsTable(params);
    if (table) out.push(table, '');
    const bodySchema = resolve(op.requestBody)?.content?.['application/json']?.schema;
    const media = resolve(op.requestBody)?.content?.['application/json'];
    const body = media?.example ?? (media?.examples ? resolve(Object.values(media.examples)[0])?.value : undefined) ?? (bodySchema ? sample(bodySchema) : undefined);
    out.push('Exemple de requête :', '', curl(method, route, params, body), '');
    const [code, response] = Object.entries(op.responses ?? {}).find(([c]) => c.startsWith('2')) ?? [];
    const content = resolve(response)?.content?.['application/json'];
    if (content) {
      const value = content.example ?? (content.examples ? resolve(Object.values(content.examples)[0])?.value : undefined) ?? sample(content.schema);
      out.push(`Réponse ${code} :`, '', jsonBlock(value), '');
    } else if (code) {
      out.push(`Réponse ${code} : ${resolve(response)?.description ?? ''}`, '');
    }
    const errors = Object.entries(op.responses ?? {}).filter(([c]) => !c.startsWith('2'));
    if (errors.length) out.push('Erreurs : ' + errors.map(([c, r]) => `${c} (${(resolve(r)?.description ?? '').split('\n')[0]})`).join(', ') + '.', '');
  }
  fs.writeFileSync(path.join(OUT, file), out.join('\n').replace(/\n{3,}/g, '\n\n'));
}
fs.writeFileSync(path.join(OUT, 'README.md'), index.join('\n') + '\n');
console.log(`docs/ : ${[...byTag.values()].filter((t) => t.ops.length).length} pages`);
