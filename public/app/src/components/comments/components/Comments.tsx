import React from 'react'
import { Comment } from '../../../models/Comment';
import moment from 'moment'
//@ts-ignore
import { get } from 'lodash'

export type Section = 'ALL' | 'NEW';

interface CommentsProps {
  comments: Comment[];
  section: Section;
  changeSection: (section: Section) => void;
  selectComment: (comment: Comment) => void;
  selectedComment: Comment | null;
}

function filterComments (comments: Comment[], section: Section) {
  return comments
  .filter((c) => section === 'NEW' ? c.approved === false : true)
}

function getTime (comment: Comment) {
  const date = new Date(comment.createdAt as string);
  console.log(date, moment.utc(date));
  return moment.utc(date).fromNow();
}

const Comments: React.FC<CommentsProps> = (props) => (
  <div className="comments-container">
    <div className="comment-section">
      <div 
        onClick={() => props.changeSection('NEW')}
        className={`comment-section-item ${props.section === 'NEW' ? 'selected': ''}`}>New</div>
      <div 
        onClick={() => props.changeSection('ALL')}
        className={`comment-section-item ${props.section === 'ALL' ? 'selected': ''}`}>All comments</div>
    </div>
    <p className="total">Showing {filterComments(props.comments,  props.section).length} comments</p>
    <div className="comments">
      {
        filterComments(props.comments,  props.section)
        .map((c: Comment, i: number) => (
        <div key={i} className={`comment ${c.id === get(props.selectedComment, 'id') ? 'selected' : ''}`}>
          <div onClick={() => props.selectComment(c)} className="name">{c.name}</div>
          <div className="date">
            {!c.approved ? <span>Needs approval</span> : ''}
            {getTime(c)}</div>
          <a target="_blank" className="link" href={`https://khalilstemmler.com${c.url}`}>{`https://khalilstemmler.com${c.url}`}</a>
          <div className="content" dangerouslySetInnerHTML={{ __html: c.comment}}></div>
        </div>
      ))}
    </div>
  </div>
)

export default Comments;