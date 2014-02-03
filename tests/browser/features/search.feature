@en.m.wikipedia.beta.wmflabs.org @en.m.wikipedia.org @test2.m.wikipedia.org
Feature: Search

  Background:
    Given I am on the home page
    When I click the placeholder search box

  Scenario: Opening search
    Then I see the search overlay

  Scenario: Closing search (overlay button)
    When I click the search overlay close button
    Then I don't see the search overlay
      And I am on the home page

  Scenario: Closing search (browser button)
    When I click the browser back button
    Then I don't see the search overlay
      And I am on the home page

  Scenario: Search for partial text
    When I type into search box "bara"
    Then Search results should contain Barack Obama
