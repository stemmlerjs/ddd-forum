
import React from 'react'
import { TextInput } from '../../../../../shared/components/text-input'
import Editor from './Editor'
import { PostType } from '../../../models/Post'
import "../styles/PostSubmission.sass"
import { PostUtil } from '../../../utils/PostUtil'
import { SubmitButton } from '../../../../../shared/components/button'

interface IPostSubmissionProps {
  updateFormField: (fieldName: string, val: string) => void;
  onPostTypeChanged: (type: PostType) => void;
  postType: PostType;
  textValue: string;
  titleValue: string;
  linkValue: string;
  onSubmit: () => void;
}

const PostSubmission: React.FC<IPostSubmissionProps> = (props) => (
  <div className="post-submission">
    <h2>Title</h2>
    <TextInput 
      type="text" 
      onChange={(val: string) => props.updateFormField('title', val)}
      placeholder="Enter the title"
    />

    <h2><span 
      onClick={() => props.onPostTypeChanged('text')} 
      className={`choice ${props.postType === 'text' ? 'active' : ''}`}>Text</span> | <span 
      onClick={() => props.onPostTypeChanged('link')}
      className={`choice ${props.postType === 'link' ? 'active' : ''}`}>Link</span> <span>(choose)</span></h2>
    
    <div 
      style={{
        display: props.postType === 'text' ? 'block' : 'none'
      }}>
      <Editor
        text={props.textValue}
        maxLength={PostUtil.maxTextLength}
        placeholder={"Write a post!"}
        handleChange={(html: string) => props.updateFormField('text', html)}
      />
    </div>

    <div 
      style={{
        display: props.postType === 'link' ? 'block' : 'none'
      }}>
      <TextInput 
        type="text" 
        onChange={(val: string) => props.updateFormField('link', val)}
        placeholder="Paste a link! Ex: https://example.com/cool-article"
      />
    </div>

    <br/>

    <SubmitButton
      onClick={() => props.onSubmit()}
      text="Submit post"
    />

  </div>
)

export default PostSubmission;