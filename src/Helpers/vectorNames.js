export const V3names = {
  AV: {
    name: 'Attack vector',
    values: {
      N: 'Network',
      A: 'Adjacent',
      L: 'Local',
      P: 'Physical',
    },
  },
  AC: {
    name: 'Attack complexity',
    values: {
      L: 'Low',
      H: 'High',
    },
  },
  PR: {
    name: 'Privileges required',
    values: {
      N: 'None',
      L: 'Low',
      H: 'High',
    },
  },
  UI: {
    name: 'User interaction',
    values: {
      N: 'None',
      R: 'Required',
    },
  },
  S: {
    name: 'Scope',
    values: {
      U: 'Unchanged',
      C: 'Changed',
    },
  },
  C: {
    name: 'Confidentiality',
    values: {
      N: 'None',
      L: 'Low',
      H: 'High',
    },
  },
  I: {
    name: 'Integrity',
    values: {
      N: 'None',
      L: 'Low',
      H: 'High',
    },
  },
  A: {
    name: 'Availability',
    values: {
      N: 'None',
      L: 'Low',
      H: 'High',
    },
  },
};

export const V2names = {
  AV: {
    name: 'Access vector',
    values: {
      N: 'Network',
      A: 'Adjacent Network',
      L: 'Local',
    },
  },
  AC: {
    name: 'Access complexity',
    values: {
      N: 'None',
      L: 'Low',
      H: 'High',
    },
  },
  Au: {
    name: 'Authentication',
    values: {
      M: 'Multiple',
      S: 'Single',
      N: 'None',
    },
  },
  C: {
    name: 'Confidentiality impact',
    values: {
      C: 'Complete',
      P: 'Partial',
      N: 'None',
    },
  },
  I: {
    name: 'Integrity impact',
    values: {
      C: 'Complete',
      P: 'Partial',
      N: 'None',
    },
  },
  A: {
    name: 'Availability impact',
    values: {
      C: 'Complete',
      P: 'Partial',
      N: 'None',
    },
  },
};
