"use strict";

exports.__esModule = true;

exports.default = function(babel) {
  const { types: t } = babel;
  return {
    name: "babel-scope-injector",
    visitor: {
      ExpressionStatement(path, state) {
        if (path.parent.type === "Program" && path.key == 0) {
          const localRef = state.opts.local || "global";
          const globalRef = state.opts.global || "global";
          path.replaceWith(
            t.functionDeclaration(t.identifier("____"), [t.identifier(localRef)], t.blockStatement([path.node]))
          );

          path.insertAfter(t.expressionStatement(t.newExpression(t.identifier("____"), [t.identifier(globalRef)])));
        }
      }
    }
  };
}
