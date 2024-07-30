"use strict";

/**
 * `is-owner` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info("In is-owner middleware.");

    const entryId = ctx.params.id;
    const user = ctx.state.user;
    const userId = user?.id;

    if (!userId) return ctx.unauthorized(`You can't access this entry`);

    const apiName = ctx.state.route.info.apiName;

    function generateUID(apiName) {
      const apiUid = `api::${apiName}.${apiName}`;
      return apiUid;
    }

    const appUid = generateUID(apiName);

    // for findOne, update, and delete
    if (entryId) {
      const entry = await strapi.entityService.findOne(appUid, entryId, {
        populate: "*",
      });

      if (entry && entry.user.id !== userId)
        return ctx.unauthorized(`You can't access this entry`);
    }

    // this is for findAll
    if (!entryId) {
      ctx.query = {
        ...ctx.query,
        filters: { ...ctx.query.filters, user: userId },
      };
    }

    await next();
  };
};
