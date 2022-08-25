declare const url: URL;
declare const functions: Record<string, any>;
declare const func: Record<string, any>;
declare const request: Request;
declare const context: ExecutionContext;

functions[func.regexp] = async (
  request: Request,
  context: ExecutionContext
) => {
  if (new RegExp(func.regexp).test(url.pathname)) {
    for (const file of func.files) {
      const mod = require(file);
      if (mod.default) {
        return mod.default(request, context);
      }
    }
  }
};
