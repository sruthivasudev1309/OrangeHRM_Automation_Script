module.exports = {
  default: `src/features/**/*.feature 
            --require-module ts-node/register 
            --require src/steps/**/*.ts 
            --format progress 
            --publish-quiet`
};
