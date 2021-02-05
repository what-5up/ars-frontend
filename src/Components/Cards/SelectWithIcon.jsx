import React from 'react';
import Select from 'react-select';
import { components } from 'react-select';
import PeopleIcon from '@material-ui/icons/People';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const ValueContainer = ({ children, ...props }) => {
	return (
		components.ValueContainer && (
			<components.ValueContainer {...props}>
				{!!children && <PeopleIcon />}
				{children}
			</components.ValueContainer>
		)
	);
};

const DropdownIndicator = (props) => {
	return (
		components.DropdownIndicator && (
			<components.DropdownIndicator {...props}>
				<LocationOnIcon />
			</components.DropdownIndicator>
		)
	);
};

const styles = {
	valueContainer: (base) => ({
		...base,
		paddingLeft: 24,
	}),
};

const customStyles = {
	option: (provided, state) => ({
		...provided,
		color: state.isSelected ? 'red' : 'blue',
		padding: 20,
	}),
	control: (provided) => ({
		// none of react-select's styles are passed to <Control />
        ...provided,
        height: '56px',
	}),
};

const formatOptionLabel = ({ value, label, customAbbreviation }) => (
	<div style={{ display: 'flex', flexDirection: 'column' }}>
		<div
			style={{
				font: '400 16px/24px Roboto,Arial,sans-serif',
				letterSpacing: '.1px',
				color: '#202124',
			}}
		>
			{label}
		</div>
		<div
			style={{
				font: '400 12px/16px Roboto,Arial,sans-serif',
				letterSpacing: '.3px',
				color: '#5f6368',
			}}
		>
			{customAbbreviation}
		</div>
	</div>
);

const SelectWithIcon = ({icon, options, placeholder}) => {
	return (
		<Select
			options={options}
			isMulti={false}
			isSearchable={true}
			components={{ DropdownIndicator }}
			formatOptionLabel={formatOptionLabel}
			classNamePrefix="vyrill"
			styles={customStyles}
			placeholder={placeholder}
		/>
	);
};

export default SelectWithIcon;
