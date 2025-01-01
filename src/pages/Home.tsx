import React, {useState} from 'react';
import {Alert, StatusBar, StyleSheet, View} from 'react-native';

import {Header} from '../components/Header';
import {Task, TasksList} from '../components/TasksList';
import {TodoInput} from '../components/TodoInput';
import {LogAction, logLokiAction} from '../oplt/logging';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const hasTaskWithThisName =
      tasks.findIndex(task => task.title === newTaskTitle) > -1;

    if (hasTaskWithThisName) {
      Alert.alert('Task already added', 'Create task with different name');
    } else {
      logLokiAction({
        action: LogAction.create,
        values: [`task name: ${newTaskTitle}`],
      });
      setTasks([
        ...tasks,
        {
          id: new Date().getTime(),
          title: newTaskTitle,
          done: false,
        },
      ]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        logLokiAction({
          action: task.done ? LogAction.uncomplete : LogAction.complete,
          values: [`task name: ${task}`],
        });

        return {
          ...task,
          done: !task.done,
        };
      }

      return task;
    });

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    const newTasks = tasks.filter(task => {
      if (task.id === id) {
        logLokiAction({
          action: LogAction.delete,
          values: [`task name: ${task}`],
        });
      }

      return task.id !== id;
    });
    setTasks(newTasks);
  }

  function handleUpdateTaskName(id: number, newTaskName: string) {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        logLokiAction({
          action: LogAction.rename,
          values: [
            `task new name: ${newTaskName}`,
            `task old name: ${task.title}`,
          ],
        });

        return {
          ...task,
          title: newTaskName,
        };
      }

      return task;
    });

    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        updateTaskName={handleUpdateTaskName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
