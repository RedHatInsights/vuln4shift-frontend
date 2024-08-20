import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Split, SplitItem, TextInput } from '@patternfly/react-core';
import { Select } from '@patternfly/react-core/deprecated';

const RangeFilterComponent = ({
  setValues,
  range,
  minMaxLabels,
  selectProps,
  inputValue,
  setInputValue,
}) => {
  const [isOpen, setOpen] = useState(false);

  const areValuesValid = (currentValues = {}, inputName) => {
    const numberValue = {
      min: Number(currentValues.min),
      max: Number(currentValues.max),
    };

    return (
      currentValues[inputName] != '' &&
      numberValue[inputName] <= range.max &&
      numberValue[inputName] >= range.min &&
      numberValue.min <= numberValue.max
    );
  };

  const handleInputChange = (newValue, inputName) => {
    const newRange = { ...inputValue, [inputName]: newValue };

    if (areValuesValid(newRange, 'min') && areValuesValid(newRange, 'max')) {
      setValues({
        min: Number(newRange.min),
        max: Number(newRange.max),
      });
    }

    setInputValue(newRange);
  };

  const filterContent = (
    <Split className="pf-v5-u-m-md">
      <SplitItem>
        <span style={{ fontSize: 'var(--pf-v5-global--FontSize--sm)' }}>
          {minMaxLabels.min}
        </span>
        <br />
        <TextInput
          type="number"
          onChange={(_event, value) => handleInputChange(value, 'min')}
          validated={areValuesValid(inputValue, 'min') ? 'default' : 'error'}
          className="range-filter-input"
          id="range-filter-input-min"
          value={inputValue?.min}
        />
      </SplitItem>
      <SplitItem>
        <br />
        <span className="pf-v5-u-m-sm">-</span>
      </SplitItem>
      <SplitItem>
        <span style={{ fontSize: 'var(--pf-v5-global--FontSize--sm)' }}>
          {minMaxLabels.max}
        </span>
        <br />
        <TextInput
          type="number"
          onChange={(_event, value) => handleInputChange(value, 'max')}
          validated={areValuesValid(inputValue, 'max') ? 'default' : 'error'}
          className="range-filter-input"
          id="range-filter-input-max"
          value={inputValue?.max}
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
  setValues: propTypes.func,
  range: propTypes.shape({ min: propTypes.number, max: propTypes.number }),
  minMaxLabels: propTypes.shape({ min: propTypes.node, max: propTypes.node }),
  selectProps: propTypes.object,
  inputValue: propTypes.shape({ min: propTypes.string, max: propTypes.string }),
  setInputValue: propTypes.func,
};

export default RangeFilterComponent;
