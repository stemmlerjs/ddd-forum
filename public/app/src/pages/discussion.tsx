
import React from 'react'
import { Layout } from '../layout';
import Header from '../components/shared/header/components/Header';
import { Post } from '../models/Post';
import { DateUtil } from '../utils/DateUtil';
import PostSummary from '../components/posts/post/components/PostSummary';
import PostComment from '../components/posts/post/components/PostComment';
import { Comment } from '../models/Comment';
import { BackNavigation } from '../components/shared/header';
import { Button } from '../components/shared/button';
import { CommentUtil } from '../utils/CommentUtil';

const post: Post = { 
  title: "Where the hell do I even start with Domain-Driven Design?",
  createdAt: DateUtil.createPreviousDate(0, 0, 10),
  postAuthor: 'stemmlerjs',
  points: 143,
  numComments: 150,
  slug: '/discuss/where-to-do-ddd',
  comments: [
    {
      commentId: '0',
      text: "Yeah yo, that's pretty cool and all but uhhh",
      postAuthor: "elonmusk",
      createdAt: DateUtil.createPreviousDate(0, 0, 10),
      childComments: [],
      postSlug: '/discuss/where-to-do-ddd',
    },
    {
      commentId: '1',
      text: `Great article dude. Here's a bunch of random text.
        Hello what's good? lkjsjjs lkjfksdjlf they provide the opportunity 
        for other (decoupled) parts of our application to execute 
        some code after that event.
      `,
      postAuthor: "elonmusk",
      createdAt: DateUtil.createPreviousDate(0, 0, 10),
      childComments: [],
      postSlug: '/discuss/where-to-do-ddd',
    },
    {
      commentId: '2',
      text: `Whoa, Elon Musk is on here?.
      `,
      parentCommentId: '0',
      postAuthor: "dondraper",
      createdAt: DateUtil.createPreviousDate(0, 0, 10),
      childComments: [],
      postSlug: '/discuss/where-to-do-ddd',
    },
    {
      commentId: '3',
      text: `Whoa, Don Draper is on here?.
      `,
      parentCommentId: '2',
      postAuthor: "tonysoprano",
      createdAt: DateUtil.createPreviousDate(0, 0, 10),
      childComments: [],
      postSlug: '/discuss/where-to-do-ddd',
    }
  ],
  text: `
    Despite the domain that they belong to, when domain events 
    are created and dispatched, they provide the opportunity 
    for other (decoupled) parts of our application to execute 
    some code after that event.
  `
}

interface DiscussionState {
  comments: Comment[]
}

class DiscussionPage extends React.Component<any, DiscussionState> {
  constructor (props: any) {
    super(props);

    this.state = {
      comments: []
    }
  }

  async getCommentsFromAPI () {
    // TODO: Actually use an API for this :)
    this.setState({
      ...this.state,
      comments: post.comments
    })
  }

  componentDidMount () {
    this.getCommentsFromAPI();
  }

  render () {
    const comments = CommentUtil.getSortedComments(this.state.comments);
    return (
      <Layout>
        <div className="flex flex-row flex-center flex-between">
          <BackNavigation
            text="Back to all discussions"
            to="/"
          />
          <Button text="Join" onClick={() => {}} />
        </div>

        <Header title={`"${post.title}"`} />
        
        <br/>
        <br/>
        <PostSummary
          {...post}
        />
        <br/>
        <br/>
        {comments.map((c, i) => (
          <PostComment key={i} {...c}/>
        ))}
      </Layout>
    )
  }
}

export default DiscussionPage;
