import { linter } from '@codemirror/lint';
import { syntaxTree } from '@codemirror/language';

const cssLinter = linter((view) => {
  const diagnostics = [];
  syntaxTree(view.state).cursor().iterate((node) => {
    if (node.name == 'StyleSheet') {
      diagnostics.push({
        from: node.from,
        to: node.to,
        severity: 'warning',
        message: 'Regular expressions are FORBIDDEN',
        actions: [{
          name: 'Remove',
          apply(view, from, to) { view.dispatch({ changes: { from, to } }); },
        }],
      });
    }
  });
  return diagnostics;
});
