const Input = ({ value, onChange, type, ...rest }) => {
    switch (type) {
      case "text":
        return (
          <TextBoxComponent
            placeholder={rest?.placeholder}
            change={({ value }) => onChange(value)}
            value={value}
          />
        );
      case "radio":
        return rest?.options.map((e) => (
          <RadioButtonComponent
            key={e}
            label={e}
            value={e}
            onChange={(value) => onChange(value)}
            checked={value === e}
          />
        ));
      case "dropdown":
        return (
          <DropDownListComponent
            dataSource={rest?.options}
            select={({ itemData }) => {
              onChange(itemData.value);
            }}
            value={value}
          />
        );
   
      case "checkbox":
        return (
          <CheckBoxComponent
            label={rest?.checkboxLabel}
            onChange={(e) => onChange(e.target.checked)}
            checked={value}
          />
        );
   
      default:
        return null;
    }
   };
   
   export default Input;
   