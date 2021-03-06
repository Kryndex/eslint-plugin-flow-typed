export default {
  create(context) {
    const options = context.options[0];
    let minTests = 3;
    let errorIndicator = '$ExpectError';
    if (typeof options === 'object') {
      if (options.hasOwnProperty('minTests') && typeof options.minTests === 'number') {
        minTests = options.minTests;
      }
      if (options.hasOwnProperty('errorIndicator') && typeof options.errorIndicator === 'string') {
        errorIndicator = options.errorIndicator;
      }
    }

    if (typeof options === 'number') {
      minTests = options;
    }



    return {
      'Program:exit'() {
        const comments = context.getAllComments();
        const expectErrorCount = comments.filter(c => c.value.trim().startsWith(errorIndicator)).length;
        if (expectErrorCount < minTests) {
          context.report({
            loc: { line: 1, column: 0 },
            message: `Test has to include at least ${minTests} negative Tests.`,
          });
        }
      },
    };
  },
};
