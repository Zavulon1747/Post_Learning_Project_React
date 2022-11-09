import React, {useState} from 'react';

const InputItem = () => {

    const [value, setValue] = useState('')


    return (
        <div>
            <h1>{value}</h1>
            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                type="text"
                placeholder={'плейсхолдер'}
            />
        </div>
    );
};

export default InputItem;