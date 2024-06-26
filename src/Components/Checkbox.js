import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxLabels({ Label, check, onClick }) {
    return (
        <FormGroup >
            <FormControlLabel
                control={
                    <Checkbox
                        checked={check}
                        style={{
                            color: check ? 'black' : undefined,
                            "& .MuiButtonBase-root": {
                                marginRight: '5px'
                            },
                            marginRight: '5px'

                        }}
                        onClick={onClick}
                    />
                }
                label={Label}
                name={Label}
                
            />
        </FormGroup>
    );
}
