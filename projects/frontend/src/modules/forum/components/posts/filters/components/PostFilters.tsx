
import React from 'react';
import "../styles/PostFilters.sass"

export type PostFilterType = 'POPULAR' | 'NEW';

interface FilterProps {
  activeFilter: PostFilterType;
  filterType: PostFilterType;
  onClick: (activeFilter: PostFilterType) => void;
  text: string;
}

const Filter:React.FC<FilterProps> = (props) => (
  <div
    onClick={() => props.onClick(props.filterType)} 
    className={`post-filter ${props.activeFilter === props.filterType ? 'active' : ''}`}>
    {props.text}
  </div>
)

interface PostFilterProps {
  activeFilter: PostFilterType;
  onClick: (activeFilter: PostFilterType) => void;
}

const PostFilters: React.FC<PostFilterProps> = (props) => (
  <div className="post-filters">
    <Filter 
      activeFilter={props.activeFilter}
      filterType={'POPULAR'}
      text="Popular"
      onClick={props.onClick}
    />
    <Filter 
      activeFilter={props.activeFilter}
      filterType={'NEW'}
      text="New"
      onClick={props.onClick}
    />
  </div>
)

export default PostFilters;