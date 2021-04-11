
import React from 'react';
import { IndexPage } from './index.page';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { IUsersService } from '../../shared/domain/users/services/userService';
import { IPostService } from '../../modules/forum/services/postService';
import { User } from '../../shared/domain/users/models/user';
import { MockUserService } from '../../shared/domain/users/mocks/mockUsersService';
import { MockPostService } from '../../shared/domain/posts/mocks/mockPostsService';
import { renderWithRouter } from '../../shared/infra/router/RouterTestUtils';

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
  describe('Given there are at least 4 posts', () => {
    describe('When the user lands on the index page', () => {
      test('Then they should see all four posts ranked by popularity', async () => {

        // Arrange
        let mockUserService: IUsersService = new MockUserService(null);
        let mockPostService: IPostService = new MockPostService([
          {
            slug: '/ddd-test',
            title: 'Domain-Driven Design Example',
            createdAt: new Date(),
            postAuthor: 'stemmlerjs',
            numComments: 0,
            points: 1,
            type: 'link',
            text: '',
            link: 'https://khalilstemmler.com/ddd',
            wasUpvotedByMe: true,
            wasDownvotedByMe: false,
          }
        ]);
        
        // Act
        renderWithRouter(<IndexPage userService={mockUserService} postService={mockPostService} />)
        await waitFor(() => screen.getByText('Domain-Driven Designers'))

        // Assert 
        // TODO: I need to verify that the four posts are shown in order
        expect(1 + 1).toBe(2)
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