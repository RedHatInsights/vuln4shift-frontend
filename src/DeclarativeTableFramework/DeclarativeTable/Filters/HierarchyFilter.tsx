import { FormEvent } from 'react';
import { conditionalFilterType } from '@redhat-cloud-services/frontend-components/ConditionalFilter';
import './HierarchyFilter.scss';

export type HierarchyFilterGroupItem = {
    id: string,
    name: string,
    type: string,
    value: string,
}

export type HierarchyFilterGroup = HierarchyFilterGroupItem & {
    groupSelectable: boolean,
    children: HierarchyFilterGroupItem[]
};

type HierarchyFilterSelection = {
    [major: string]: {
        [minor: string]: boolean;
    };
};

interface HierarchyFilterProps {
    urlParam: string;
    label: string;
    value?: string;
    placeholder: string;
    chipLabel: string;
    groups: HierarchyFilterGroup[];
    apply: (params: object, replaceState?: boolean) => void;
}

const hierarchyFilter = ({ urlParam, label, value, placeholder, chipLabel, groups, apply }: HierarchyFilterProps) => {
    const minorItems = groups.map(group => group.children).flat();

    const toString = (filterValuesObject?: HierarchyFilterSelection) => {
        if (filterValuesObject === undefined) {
            return "";
        }
        else {
            return Object
                .values(filterValuesObject)
                .map(minorObject => Object.keys(minorObject).filter(key => minorObject[key] === true))
                .flat()
                .join(',');
        }
    }

    const toObject = (string?: string) => {
        if (typeof (string) !== 'string') return;

        const minorObjects = string.split(',');
        const majorObjects = minorObjects
            .map(minorObject => groups.find(group => group.children.map(ch => ch.id).includes(minorObject))?.id)
            .filter(prop => prop !== undefined);

        const filterValuesString: HierarchyFilterSelection = {};

        minorObjects.forEach((minorObject, index) => {
            const majorObject = majorObjects[index];

            if (filterValuesString[majorObject] === undefined) {
                filterValuesString[majorObject] = {};
            }

            filterValuesString[majorObject][minorObject] = true;
        })

        return filterValuesString;
    }

    const onValuesChanged = (values?: HierarchyFilterSelection) => {
        apply({
            [urlParam]: toString(values) || undefined,
            offset: 0,
        });
    };

    const filterConfig = {
        label,
        type: conditionalFilterType.group,
        urlParam,
        key: urlParam,
        filterValues: {
            onChange: (_event: FormEvent<HTMLInputElement>, value: HierarchyFilterSelection) => {
                onValuesChanged(value);
            },
            placeholder,
            groups,
            selected: toObject(value)
        }
    };

    const activeFiltersConfig = {
        isShown: !!value,
        key: urlParam,
        category: chipLabel,
        onDelete: (chips: { value: string }[]) => {
            const itemsToRemove = chips.map((chip) => chip.value);

            const newValue = value!
                .split(',')
                .filter((value) => !itemsToRemove.includes(value));

            onValuesChanged(toObject(newValue.join(',')));
        },
        chips: minorItems
            .filter((item) => value?.split(',').includes(item.value))
            .map((item) => ({ name: item.name, value: item.value })),
    };

    return { filterConfig, activeFiltersConfig };
};

export default hierarchyFilter;
