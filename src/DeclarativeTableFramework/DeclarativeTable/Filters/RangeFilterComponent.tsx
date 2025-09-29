import React, { useState } from 'react';
import { Select, SelectList, SelectOption, Split, SplitItem, TextInput, MenuToggle, MenuToggleElement } from '@patternfly/react-core';

interface RangeFilterComponentProps {
  setValues: (values: { min: number; max: number }) => void;
  range: { min: number; max: number };
  minMaxLabels: { min: React.ReactNode; max: React.ReactNode };
  selectProps?: Record<string, any>;
  inputValue?: { min?: string; max?: string };
  setInputValue: (value: { min?: string; max?: string } | undefined) => void;
}

const RangeFilterComponent = ({
  setValues,
  range,
  minMaxLabels,
  selectProps,
  inputValue,
  setInputValue,
}: RangeFilterComponentProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const areValuesValid = (currentValues : { min?: string, max?: string } = {}, inputName: 'min' | 'max') => {
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

  const handleInputChange = (newValue: string, inputName: string) => {
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
    <Split style={{ margin: "0px 16px" }}>
      <SplitItem>
        <span style={{ fontSize: 'var(--pf-v5-global--FontSize--sm)' }}>
          {minMaxLabels.min}
        </span>
        <br />
        <TextInput
          type="number"
          onChange={(_event, value) => handleInputChange(value, 'min')}
          validated={areValuesValid(inputValue, 'min') ? 'default' : 'error'}
          id="range-filter-input-min"
          value={inputValue?.min}
          style={{ width: '128px' }}
        />
      </SplitItem>
      <SplitItem>
        <br />
        <span style={{ margin: 16 }}>-</span>
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
          id="range-filter-input-max"
          value={inputValue?.max}
          style={{ width: '128px' }}
        />
      </SplitItem>
    </Split>
  );

  const toggle = (toggleRef: React.Ref<MenuToggleElement>) => (
    <MenuToggle
      ref={toggleRef}
      onClick={() => setOpen(!isOpen)}
      isExpanded={isOpen}
    >
      {selectProps?.placeholderText || 'CVSS score'}
    </MenuToggle>
  );

  return (
    <Select
      isOpen={isOpen}
      onOpenChange={(open) => setOpen(open)}
      toggle={toggle}
      popperProps={{ minWidth: 'trigger' }}
    >
      <SelectList>
        <SelectOption isAriaDisabled component="div">
          {filterContent}
        </SelectOption>
      </SelectList>
    </Select>
  );
};

export default RangeFilterComponent;
