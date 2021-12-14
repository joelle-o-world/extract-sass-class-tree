function extractSASSClassTree(el) {
  let rules = {}
  for(let child of el.children) {
    let rule = getRuleForElement(child);
    if(rules[rule]) {
      mergeRules(rules[rule], extractSASSClassTree(child))
    } else
      rules[rule] = extractSASSClassTree(child)
  }

  return rules
}

function mergeRules(a, b) {
  for(let i in b) {
    if(a[i] && b[i]) {
      a[i] = mergeRules(a[i], b[i]);
    } else // only in b
      a[i] = b[i]
  }
  return a
}

function getRuleForElement(el) {
  let classes = el.className.split(' ');
  let id = el.id;

  let rule = el.nodeName.toLowerCase();

  if(id)
    rule += `#${id}`;

  for(let c of classes) {
    if(c.length)
      rule += `.${c}`;
  }

  return rule
}

function printTree(head, tree, indentation=0) {
  let str = ''

  let tab = '  '.repeat(indentation)
  str += tab + head + '\n'
  
  for(let rule in tree) {
    str += printTree(rule, tree[rule], indentation + 1);
  }

  return str;
}
