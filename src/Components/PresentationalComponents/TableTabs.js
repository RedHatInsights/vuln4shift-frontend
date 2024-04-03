import React from 'react';
import propTypes from 'prop-types';
import { Tab, TabTitleText, Tabs } from '@patternfly/react-core';
import { useLocation, useNavigate } from 'react-router-dom';
import { urlChangeTab } from '../../Helpers/miscHelper';

const TableTabs = ({ activeTab, tabs }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const renderTab = ({ path, title, Component }) => {
    const isTabActive = activeTab === path;

    return (
      <Tab
        key={path}
        eventKey={path}
        title={<TabTitleText>{title}</TabTitleText>}
      >
        {isTabActive && <Component />}
      </Tab>
    );
  };

  return (
    <Tabs
      className="pf-m-light pf-v5-c-table"
      activeKey={activeTab}
      onSelect={(e, newTab) =>
        navigate(urlChangeTab(location.pathname, newTab))
      }
    >
      {tabs.map((tab) => renderTab(tab))}
    </Tabs>
  );
};

TableTabs.propTypes = {
  activeTab: propTypes.string,
  tabs: propTypes.arrayOf(
    propTypes.objectOf({
      title: propTypes.string.isRequired,
      path: propTypes.string.isRequired,
      Component: propTypes.elementType.isRequired,
    })
  ).isRequired,
};

export default TableTabs;
