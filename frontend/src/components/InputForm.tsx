import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom';

interface InputFormProps {
    title: string;
    content: string;
    buttonText: string;
    onSave: (title: string, content: string) => void;
}

const defaultInputFormProps: InputFormProps = {
    title: '',
    content: '',
    buttonText: 'Submit',
    onSave: () => {}
}

function InputForm(props: InputFormProps = defaultInputFormProps) {
    const { title, content, buttonText } = props;
    const navigator = useNavigate();

    const [inputTitle, setInputTitle] = React.useState(title);
    const [inputContent, setInputContent] = React.useState(content);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.target.value);
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputContent(e.target.value);
    }

    const handleSave = (e: any) => {
        e.preventDefault();
        props.onSave(inputTitle, inputContent);
    }

    const handleReset = (e: any) => {
        e.preventDefault();
        setInputTitle('');
        setInputContent('');
    }

    const handleCancel = (e: any) => {
        e.preventDefault();
        navigator('/');
    }

    useEffect(() => {
        setInputTitle(title);
        setInputContent(content);
    }, [content, title]);



  return (
    <form>
            <label htmlFor="title">Title</label>
            <br />
            <input type="text" id="title" name="title" value={inputTitle} onChange={handleTitleChange} />
            <br />
            <br />
            <label htmlFor="content">Content</label>
            <br />
            <textarea id="content" name="content" value={inputContent} onChange={handleContentChange} />
            <br />
        <button onClick={handleSave}>{buttonText}</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleCancel} >Cancel</button>
    </form>
  )
}

export default InputForm
