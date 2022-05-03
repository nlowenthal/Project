import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function Editor({ onChange, isEditorLoaded, name, value }) {
    const editorRef = useRef();
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    useEffect(() => {
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
        };
    }, []);

    return (
        <div>
            {isEditorLoaded ? (
                <CKEditor
                    type=""
                    name={name}
                    editor={ClassicEditor}
                    data={value}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        // console.log({ event, editor, data })
                        onChange(data);
                    }}
                />
            ) : (
                <div>Editor loading</div>
            )}
        </div>
    );
}

Editor.propTypes = {
    onChange: PropTypes.func,
    isEditorLoaded: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.string,
};

export default Editor;
