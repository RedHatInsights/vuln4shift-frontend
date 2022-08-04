const { orderBy } = require('lodash');

const limitOffset = (data, offset, limit) => {
  offset = parseInt(offset);
  limit = parseInt(limit);
  const temp = data.data.slice(offset, limit + offset);
  return {
    ...data,
    data: temp,
    meta: {
      ...data.meta,
      limit,
      offset,
      total_items: data.data.length,
    },
  };
};

const search = (data, name) => {
  name = name.toLowerCase();
  const temp = data.data.filter(
    (item) =>
      // Matches Description or Synopsis (ID)
      item.description.toLowerCase().includes(name) ||
      item.synopsis.toLowerCase().includes(name)
  );
  return {
    ...data,
    data: temp,
    meta: {
      ...data.meta,
      search: name,
      total_items: temp.length,
    },
  };
};

const cvss_score = (data, range) => {
  range = range.split(',');
  let from = parseInt(range[0]);
  let to = parseInt(range[1]);
  // Data are in range
  const temp = data.data.filter(
    (item) => item.cvss3_score >= from && item.cvss3_score <= to
  );
  return {
    ...data,
    data: temp,
    meta: {
      ...data.meta,
      total_items: temp.length,
    },
  };
};

const sort = (data, type) => {
  let sortType = 'asc';
  if (type[0] === '-') {
    sortType = 'desc';
    type = type.slice(1);
  }
  if (type === 'cvss_score') type = 'cvss3_score';
  let temp = orderBy(data.data, type, sortType);
  return {
    ...data,
    data: temp,
    meta: {
      ...data.meta,
    },
  };
};

module.exports = {
  limitOffset,
  search,
  cvss_score,
  sort,
};
