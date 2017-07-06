import { expect } from 'chai'
import * as actions from '../action-types'
import { merge, remove } from '../actions'

const state = {
  todos: {
    1: { id: 1, title: 'Do something', completed: true },
    2: { id: 2, title: 'Do something else' },
    3: { id: 3, title: 'Do nothing' }
  },
  things: {
    1: { id: 1, name: 'Foo' },
    2: { id: 2, name: 'Bar' }
  },
  stuff: {
    1: { id: 1, name: 'Baz' },
    2: { id: 2, name: 'Qux' }
  }
}

describe('Action creators', function() {

  describe('merge', function() {

    it(`If called without arguments, an empty ${actions.MERGE} action is returned`, function() {
      expect(merge()).to.deep.equal({ type: actions.MERGE, payload: {} })
    })

    describe('merge(schemaDictionary) - Merge a schema dictionary into the state', function() {

      it('If only passed one argument, it is expected to be a dictionary of schemas', function() {
        expect(() => merge({ schema: {} })).to.not.throw()
        expect(() => merge({})).to.not.throw() // NOTE: empty schema dictionary
        expect(() => merge('string')).to.throw()
        expect(() => merge(0)).to.throw()
        expect(() => merge([])).to.throw()
        expect(() => merge(void 0)).to.throw()
        expect(() => merge(null)).to.throw()
        expect(() => merge({ schema: 'string' })).to.throw()
        expect(() => merge({ schema: 0 })).to.throw()
        expect(() => merge({ schema: [] })).to.throw()
        expect(() => merge({ schema: void 0 })).to.throw()
        expect(() => merge({ schema: null })).to.throw()
      })

      it(`Returns a ${actions.MERGE} action containing the entire schema dictionary`, function() {
        expect(merge(state)).to.deep.equal({
          type: actions.MERGE,
          payload: state
        })
      })

    })

    describe('merge(schema, entityDictionary) - Merge an entity dictionary into the state', function() {

      it('If passed more than one argument, 1st is expected to be a string', function() {
        expect(() => merge('string', 1, {})).to.not.throw()
        expect(() => merge(0, {})).to.throw()
        expect(() => merge([], 'string', {})).to.throw()
        expect(() => merge({}, {})).to.throw()
        expect(() => merge(void 0, 1, {})).to.throw()
        expect(() => merge(null, {})).to.throw()
      })

      it('If passed two arguments, 2nd is expected to be an object', function() {
        expect(() => merge('string', {})).to.not.throw()
        expect(() => merge('string', 'string')).to.throw()
        expect(() => merge('string', 0)).to.throw()
        expect(() => merge('string', [])).to.throw()
        expect(() => merge('string', void 0)).to.throw()
        expect(() => merge('string', null)).to.throw()
      })

      it(`Returns a ${actions.MERGE} action containing a single entity dictionary`, function() {
        expect(merge('todos', state.todos)).to.deep.equal({
          type: actions.MERGE,
          payload: { todos: state.todos }
        })
      })

    })

    describe('merge(schema, entityId, entityBody) - Merge an entity into the state', function() {

      it('If passed more than two arguments, 2nd is expected to be a string or a number', function() {
        expect(() => merge('string', 'string', {})).to.not.throw()
        expect(() => merge('string', 1, {})).to.not.throw()
        expect(() => merge('string', {}, {})).to.throw()
        expect(() => merge('string', [], {})).to.throw()
        expect(() => merge('string', void 0, {})).to.throw()
        expect(() => merge('string', null, {})).to.throw()
      })

      it('If passed three arguments, 3rd is expected to be an object', function() {
        expect(() => merge('string', 1, {})).to.not.throw()
        expect(() => merge('string', 1, 'string')).to.throw()
        expect(() => merge('string', 1, 0)).to.throw()
        expect(() => merge('string', 1, [])).to.throw()
        expect(() => merge('string', 1, void 0)).to.throw()
        expect(() => merge('string', 1, null)).to.throw()
      })

      it(`Returns a ${actions.MERGE} action containing a single entity dictionary with a single entity in it`, function() {
        expect(merge('todos', 1, state.todos[1])).to.deep.equal({
          type: actions.MERGE,
          payload: { todos: { 1: state.todos[1] } }
        })
      })

    })

  })

  describe('remove', function() {

    describe('remove() - Clear all entities\' state', function() {

      it(`If called without arguments, returns a ${actions.CLEAR} action`, function() {
        expect(remove()).to.deep.equal({ type: actions.CLEAR })
      })

    })

    describe('remove(schemas) - Remove entire schemas from the state', function() {

      it('If only passed one argument, it is expected to be a string or an array of strings', function() {
        expect(() => remove('string')).to.not.throw()
        expect(() => remove([])).to.not.throw()
        expect(() => remove(0)).to.throw()
        expect(() => remove({})).to.throw()
        expect(() => remove(void 0)).to.throw()
        expect(() => remove(null)).to.throw()
      })

      it(`Returns a ${actions.REMOVE_SCHEMAS} action for the given schemas`, function() {
        let action = remove('todos')
        expect(action).to.be.an('object').that.has.all.keys('type', 'payload')
        expect(action.type).to.equal(actions.REMOVE_SCHEMAS)
        expect(action.payload).to.deep.equal(['todos'])

        action = remove(['todos', 'things'])
        expect(action).to.be.an('object').that.has.all.keys('type', 'payload')
        expect(action.type).to.equal(actions.REMOVE_SCHEMAS)
        expect(action.payload).to.deep.equal(['todos', 'things'])
      })

    })

    describe('remove(schema, ids) - Remove entities from the state', function() {

      it('If passed two arguments, 1st is expected to be a string', function() {
        expect(() => remove('string', 0)).to.not.throw()
        expect(() => remove([], 0)).to.throw()
        expect(() => remove(0, 0)).to.throw()
        expect(() => remove({}, 0)).to.throw()
        expect(() => remove(void 0, 0)).to.throw()
        expect(() => remove(null, 0)).to.throw()
      })

      it('If passed two arguments, 2nd is expected to be a string or a number, or an array of them', function() {
        expect(() => remove('string', 1)).to.not.throw()
        expect(() => remove('string', 'string')).to.not.throw()
        expect(() => remove('string', [])).to.not.throw()
        expect(() => remove('string', {})).to.throw()
        expect(() => remove('string', void 0)).to.throw()
        expect(() => remove('string', null)).to.throw()
      })

      it(`Returns a ${actions.REMOVE_ENTITIES} action for the given entities`, function() {
        let action = remove('todos', 1)
        expect(action).to.be.an('object').that.has.all.keys('type', 'payload')
        expect(action.type).to.equal(actions.REMOVE_ENTITIES)
        expect(action.payload).to.be.an('object').that.has.all.keys('schema', 'entities')
        expect(action.payload.schema).to.equal('todos')
        expect(action.payload.entities).to.deep.equal([1])

        action = remove('todos', [1, 2])
        expect(action).to.be.an('object').that.has.all.keys('type', 'payload')
        expect(action.type).to.equal(actions.REMOVE_ENTITIES)
        expect(action.payload).to.be.an('object').that.has.all.keys('schema', 'entities')
        expect(action.payload.schema).to.equal('todos')
        expect(action.payload.entities).to.deep.equal([1, 2])
      })

    })

  })

})