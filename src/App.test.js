import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import App, { Row } from './App';

describe('App', () => {
  test('renders table', () => {
    const wrapper = shallow(<App />)
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test('Will handle task completion', () => {
    const wrapper = shallow(<App />);
    let row = wrapper.find('Row').at(1)
    expect(row.props().row.completed).toBe(false);
    row.props().onCompleteTask({ target: { id: '2' } });
    row = wrapper.find('Row').at(1)
    expect(row.props().row.completed).toBe(true);
  })
  test('Will render the task dialog', () => {
    const wrapper = shallow(<App />);
    let taskDialog = wrapper.find('TaskDialog')
    expect(taskDialog.isEmptyRender()).toBe(true);
    const addTaskButton = wrapper.find({ id: "add-task" })
    addTaskButton.props().onClick()
    taskDialog = wrapper.find('TaskDialog')
    expect(taskDialog.isEmptyRender()).toBe(false);
  })
  test('Will hide the task dialog', () => {
    const wrapper = shallow(<App />);
    const addTaskButton = wrapper.find({ id: "add-task" })
    addTaskButton.props().onClick()
    let taskDialog = wrapper.find('TaskDialog')
    expect(taskDialog.isEmptyRender()).toBe(false);
    taskDialog.props().handleCancel()
    taskDialog = wrapper.find('TaskDialog')
    expect(taskDialog.isEmptyRender()).toBe(true);
  })
  test('Will add a task', () => {
    const wrapper = shallow(<App />);
    const addTaskButton = wrapper.find({ id: "add-task" })
    addTaskButton.props().onClick()
    let taskDialog = wrapper.find('TaskDialog')
    taskDialog.props().handleOk({ name: 'stub task', description: 'stub description' })
    const rows = wrapper.find('Row')
    const newTask = rows.at(3)
    expect(rows.length).toBe(4);
    expect(newTask.props().row).toStrictEqual({
      name: 'stub task',
      description: 'stub description',
      id: expect.any(String)
    })
  })
})

describe('rows', () => {
  let rowProps;
  beforeEach(() => {
    rowProps = {
      row: {
        id: "1",
        name: "Task 1",
        completed: false,
        description: "This is task # 1"
      },
      onCompleteTask: jest.fn()
    }
  })
  afterEach(() => {
    rowProps = null;
  })
  test('renders row', () => {
    const wrapper = shallow(<Row {...rowProps} />)
    expect(toJson(wrapper)).toMatchSnapshot();
  })
  test('expands a row', () => {
    const wrapper = shallow(<Row {...rowProps} />)
    let collapseableRow = wrapper.find('ForwardRef(Collapse)');
    expect(collapseableRow.props().in).toBe(false);
    const collapseButton = wrapper.find({ "aria-label": "expand row" })
    collapseButton.props().onClick();
    collapseableRow = wrapper.find('ForwardRef(Collapse)');
    expect(collapseableRow.props().in).toBe(true);
  })
  test('Will toggle to complete a task', () => {
    const wrapper = shallow(<Row {...rowProps} />)
    const completedToggle = wrapper.find('ForwardRef(Checkbox)')
    completedToggle.props().onChange();
    expect(rowProps.onCompleteTask).toHaveBeenCalled()
  })
})

