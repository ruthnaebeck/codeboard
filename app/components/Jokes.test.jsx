import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())

import {shallow} from 'enzyme'

import Jokes from './Jokes'

/* global describe it beforeEach xit */
describe('<Jokes />', () => {
  const joke = {
    q: 'Why did the skeleton write tests?',
    a: 'To see if she did anything bone-headed.',
  }

  let root
  beforeEach('render the root', () =>
    root = shallow(<Jokes />)
  )

  xit('shows a joke', () => {
    root.setState({ joke, answered: false })
    expect(root.find('h1')).to.have.length(1)
    expect(root.find('h1').text()).equal(joke.q)
  })

  xit("doesn't show the answer when state.answered=false", () => {
    root.setState({ joke, answered: false })
    expect(root.find('h2')).to.have.length(0)
  })

  xit('shows the answer when state.answered=true', () => {
    root.setState({ joke, answered: true })
    expect(root.find('h2')).to.have.length(1)
    expect(root.find('h2').text()).to.equal(joke.a)
  })

  xit('when tapped, sets state.answered=true', () => {
    root.setState({ joke, answered: false })
    root.simulate('click')
    expect(root.state().answered).to.be.true
  })
})
