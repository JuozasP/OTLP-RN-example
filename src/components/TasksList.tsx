import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {ItemWrapper} from './ItemWrapper';
import {TaskItem} from './TaskItem';
import {MotiView} from 'moti';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  updateTaskName: (id: number, newTaskName: string) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  updateTaskName,
}: TasksListProps) {
  const renderItem = useCallback(
    ({item, index}: {item: Task; index: number}) => {
      return (
        <MotiView
          from={{opacity: 0, translateY: 20}}
          animate={{opacity: 1, translateY: 0}}
          transition={{
            type: 'timing',
            duration: 350,
          }}>
          <ItemWrapper index={index}>
            <TaskItem
              checked={item.done}
              index={index}
              task={item}
              toggleTaskDone={toggleTaskDone}
              removeTask={removeTask}
              updateTaskName={updateTaskName}
            />
          </ItemWrapper>
        </MotiView>
      );
    },
    [removeTask, toggleTaskDone, updateTaskName],
  );

  const keyExtractor = (item: Task) => String(item.id);

  return (
    <FlatList
      data={tasks}
      keyExtractor={keyExtractor}
      contentContainerStyle={{paddingBottom: 24}}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      style={{
        marginTop: 32,
      }}
    />
  );
}
