
import * as usePosts from '../../shared/domain/posts/hooks/usePosts'

import React from 'react';
import { IndexPage } from './index.page';
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../shared/infra/router/RouterTestUtils';
import { act } from 'react-dom/test-utils';

/**
 * @name IndexPageAcceptanceTest
 * @type Integration
 * @desc Pages contain features. Features are user stories, use cases, commands, or queries.
 * Features are known to have one or more acceptance tests. Therefore, for each page, we'll 
 * write the acceptance tests to test each feature. These will be the highest level tests.
 * They are going to be "unit" tests (though Kent C. Dodds, a popular React educator, calls them
 * integration tests - where integration tests are actually synonymous to "contract" tests, testing 
 * code you don't own). We're only interested in testing code we own. And we want these tests to
 * run fast. There will be gaps, but we will fill those with "integration" and (component-level)
 * "unit" tests later.
 * 
 */

describe('Index page', () => {
  describe('Given the user is logged out and there are at least 4 posts', () => {
    describe('When the user lands on the index page', () => {
      test('Then they should see all four posts ranked by popularity', async () => {
  
        // Arrange
        jest.spyOn(usePosts, 'usePosts').mockImplementation(() => (
          {
            operations: { 
              getRecentPosts: async () => {},
              getPopularPosts: async () => {},
              upvotePost: async () => {},
              downvotePost: async () => {},
            },
            state: { 
              recentPosts: [],
              popularPosts: [
                {
                  slug: '/',
                  title: '/ddd-forum',
                  createdAt: new Date(),
                  postAuthor: '@khalil',
                  numComments: 0,
                  points: 2,
                  type: 'text',
                  text: 'this is a test',
                  link: 'http://google.com',
                  wasUpvotedByMe: false,
                  wasDownvotedByMe: true,
                },
                {
                  slug: '/',
                  title: '/ddd-forum',
                  createdAt: new Date(),
                  postAuthor: '@khalil',
                  numComments: 0,
                  points: 2,
                  type: 'text',
                  text: 'this is a test',
                  link: 'http://google.com',
                  wasUpvotedByMe: false,
                  wasDownvotedByMe: true,
                },
                {
                  slug: '/',
                  title: '/ddd-forum',
                  createdAt: new Date(),
                  postAuthor: '@khalil',
                  numComments: 0,
                  points: 2,
                  type: 'text',
                  text: 'this is a test',
                  link: 'http://google.com',
                  wasUpvotedByMe: false,
                  wasDownvotedByMe: true,
                },
                {
                  slug: '/',
                  title: '/ddd-forum',
                  createdAt: new Date(),
                  postAuthor: '@khalil',
                  numComments: 0,
                  points: 2,
                  type: 'text',
                  text: 'this is a test',
                  link: 'http://google.com',
                  wasUpvotedByMe: false,
                  wasDownvotedByMe: true,
                }
              ]
            }
          }
        ));
        
        // Act
        const result = renderWithRouter(
          <IndexPage />
        );

        result.findByText('Domain-Driven Designers');

        // Assert 
        let elements;

        act(() => {
          elements = screen.getAllByTestId('post-row');
        })
        
        expect(elements).toHaveLength(4)
      });
    })
  })

  

  /**
   * Scenario: Seeing the most popular posts by default
   * 
   * Scenario: Seeing the newest posts 
   * 
   * Scenario: Shows my username when I'm logged in
   * 
   * Scenario: Presents an option to join when I'm not logged in
   * 
   */
  
})