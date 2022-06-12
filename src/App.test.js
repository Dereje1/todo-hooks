import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import App from './App';

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
    taskDialog.props().handleOk({ name: 'stub task', description: 'stub description' }, null)
    const rows = wrapper.find('Row')
    const newTask = rows.at(3)
    expect(rows.length).toBe(4);
    expect(newTask.props().row).toStrictEqual({
      name: 'stub task',
      description: 'stub description',
      id: expect.any(String)
    })
  })
  test('Will delete a task', () => {
    const wrapper = shallow(<App />);
    let row = wrapper.find('Row').at(1)
    expect(row.props().row.id).toBe("2");
    row.props().onDeleteTask("2");
    row = wrapper.find('Row').at(1)
    expect(row.props().row.id).toBe("3");
  })
  test('Will edit a task', () => {
    const wrapper = shallow(<App />);
    const editTaskButton = wrapper.find('Row').at(1)
    editTaskButton.props().onEditTask()
    let taskDialog = wrapper.find('TaskDialog')
    taskDialog.props().handleOk({ name: 'stub-edited-task', description: 'stub-edited-description' }, {id: '2'})
    const rows = wrapper.find('Row')
    const editedTask = rows.at(1)
    expect(editedTask.props().row).toStrictEqual({
      name: 'stub-edited-task',
      description: 'stub-edited-description',
      id: "2"
    })
  })
  test('Will filter completed tasks', () => {
    const wrapper = shallow(<App />);
    let rows = wrapper.find('Row')
    expect(rows.length).toBe(3);
    let row = rows.at(1)
    row.props().onCompleteTask({ target: { id: '2' } });
    const filterCompletedTasksButton = wrapper.find({ id: "completed-tasks" })
    filterCompletedTasksButton.props().onClick()
    rows = wrapper.find('Row')
    expect(rows.length).toBe(1);
  })

  test('Will filter active tasks', () => {
    const wrapper = shallow(<App />);
    let rows = wrapper.find('Row')
    expect(rows.length).toBe(3);
    let row = rows.at(1)
    row.props().onCompleteTask({ target: { id: '2' } });
    const filterActiveTasksButton = wrapper.find({ id: "active-tasks" })
    filterActiveTasksButton.props().onClick()
    rows = wrapper.find('Row')
    expect(rows.length).toBe(2);
  })
})

