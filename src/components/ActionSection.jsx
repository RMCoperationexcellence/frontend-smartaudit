// ActionSection.js
import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const ActionSection = ({
  primaryText,
  checkboxes,
  textFieldLabel,
  permissions,
  requiredPermission,
  onInputChange,
}) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems({
      ...checkedItems,
      [name]: checked,
    });
    onInputChange(`${primaryText}_choice`, checked ? 1 : null); // Notify parent component of checkbox change
  };

  const handleTextFieldChange = (event) => {
    const { value } = event.target;
    onInputChange(`${primaryText}_desc`, value); // Notify parent component of text field change
  };

  if (!permissions.includes(requiredPermission)) {
    return null;
  }

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={
          <Box component="div" sx={{ mb: 2 }}>
            <Typography variant="h5" component="div" gutterBottom>
              {primaryText}
            </Typography>
          </Box>
        }
        secondary={
          <Box component="div">
            {checkboxes.map((checkboxLabel, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={!!checkedItems[checkboxLabel]}
                    onChange={handleCheckboxChange}
                    name={checkboxLabel}
                  />
                }
                label={checkboxLabel}
                sx={{ mb: 1, mr: 1 }}
              />
            ))}
            <TextField
              name={`${primaryText}_desc`} // Use a unique name for each text field
              label={textFieldLabel}
              variant="outlined"
              size="small"
              sx={{ mt: 1, backgroundColor: "white", width: "100%" }}
              onChange={handleTextFieldChange}
            />
          </Box>
        }
      />
    </ListItem>
  );
};

export default ActionSection;
