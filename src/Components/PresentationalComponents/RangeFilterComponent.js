import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Split, SplitItem, TextInput, Select } from '@patternfly/react-core';

const RangeFilterComponent = ({
  value,
  setValue,
  range,
  minMaxLabels,
  selectProps,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState({
    min: value.min.toString(),
    max: value.max.toString(),
  });

  useEffect(() => {
    if (isInputValid('min') && isInputValid('max')) {
      setValue({
        min: Number(inputValue.min),
        max: Number(inputValue.max),
      });
    }
  }, [inputValue]);

  const isInputValid = (inputName) => {
    const numberValue = {
      min: Number(inputValue.min),
      max: Number(inputValue.max),
    };

    return (
      inputValue[inputName] != '' &&
      numberValue[inputName] <= range.max &&
      numberValue[inputName] >= range.min &&
      numberValue.min <= numberValue.max
    );
  };

  const handleInputChange = (newValue, inputName) => {
    setInputValue({ ...inputValue, [inputName]: newValue });
  };

  const filterContent = (
    <Split className="pf-u-m-md">
      <SplitItem>
        <span style={{ fontSize: 'var(--pf-global--FontSize--sm)' }}>
          {minMaxLabels.min}
        </span>
        <br />
        <TextInput
          type="number"
          onChange={(value) => handleInputChange(value, 'min')}
          validated={isInputValid('min') ? 'default' : 'error'}
          className="range-filter-input"
          id="range-filter-input-min"
          value={inputValue.min}
        />
      </SplitItem>
      <SplitItem>
        <br />
        <span className="pf-u-m-sm">-</span>
      </SplitItem>
      <SplitItem>
        <span style={{ fontSize: 'var(--pf-global--FontSize--sm)' }}>
          {minMaxLabels.max}
        </span>
        <br />
        <TextInput
          type="number"
          onChange={(value) => handleInputChange(value, 'max')}
          validated={isInputValid('max') ? 'default' : 'error'}
          className="range-filter-input"
          id="range-filter-input-max"
          value={inputValue.max}
        />
      </SplitItem>
    </Split>
  );

  return (
    <Select
      variant="panel"
      aria-label="Select Input"
      customContent={filterContent}
      onToggle={() => setOpen(!isOpen)}
      isOpen={isOpen}
      width="auto"
      {...selectProps}
    />
  );
};

RangeFilterComponent.propTypes = {
  value: propTypes.shape({ min: propTypes.number, max: propTypes.number }),
  setValue: propTypes.func,
  range: propTypes.shape({ min: propTypes.number, max: propTypes.number }),
  minMaxLabels: propTypes.shape({ min: propTypes.node, max: propTypes.node }),
  selectProps: propTypes.object,
};

export default RangeFilterComponent;
