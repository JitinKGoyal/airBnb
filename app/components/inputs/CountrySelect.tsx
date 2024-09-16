'use client';
import React from 'react';
import useCountries from '../../hooks/useCountries';
import Select from 'react-select';
import countries from 'world-countries';

export type CountrySelectValue = {
	value: string;
	label: string;
	flag: string;
	latlang: [number, number];
	region: string;
};

interface CountrySelectProps {
	value?: CountrySelectValue;
	onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ onChange, value }) => {
	const { getAll } = useCountries();

	console.log('countries', countries);
	return (
		<div>
			<Select
				placeholder="Anywhere"
				isClearable
				options={getAll()}
				value={value}
				onChange={value => onChange(value as CountrySelectValue)}
				formatOptionLabel={(option: CountrySelectValue) => (
					<div className="flex flex-row items-center gap-3">
						<div className="text-neutral-500">{option.flag} </div>
						<div>
							{option.label},<span className="text-neutral-500 ml-1">{option.region}</span>
						</div>
					</div>
				)}
				classNames={{ control: () => 'p-3 border-2', input: () => 'text-lg', option: () => 'text-lg' }}
				theme={theme => ({
					...theme,
					borderRadius: 6,
					colors: {
						...theme.colors,
						primary: 'black',
						primary25: '#ffe4e6'
					}
				})}
			/>
		</div>
	);
};

export default CountrySelect;
