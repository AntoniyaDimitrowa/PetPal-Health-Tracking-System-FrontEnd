const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#D2E9D7',
        border: '1px solid #D2E9D7',
        boxShadow: state.isFocused ? '0 0 0 2px #007bff' : null,
        padding: '0.5rem',
        '&:hover': {
            border: '1px solid #66BF7B',
        },
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#007bff' : state.isFocused ? '#E4F3E6' : '#D2E9D7',
        color: state.isSelected ? 'white' : 'black',
        '&:hover': {
            backgroundColor: '#D2E9D7',
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#D2E9D7',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'black',
    }),
};

export default customStyles;
