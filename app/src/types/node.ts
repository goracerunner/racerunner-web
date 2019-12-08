import { Timestamp } from "./global";
import { firestore } from "./local";

/**
 * A node's details in Firestore.
 *
 * Document path: `races/{raceId}/nodes/{nodeId}`
 */
export interface Node {
  /**
   * The unique id for the node.
   */
  nodeId: string;

  /**
   * The order which the node should appear in.
   */
  order: number;

  /**
   * If `protected` is true, teams can only see the node if they
   * have explicitly unlocked the node.
   */
  protected: boolean;

  /**
   * A list of teams who have unlocked this node.
   */
  unlockedTeams: string[];

  /**
   * A list of users who have unlocked this node.
   * This should be in sync with the `unlockedTeams` field.
   */
  unlockedUsers: string[];
}

/**
 * Protected meta information about a node, only viewable by managers
 * and users whose team have unlocked the node.
 *
 * Document path: `races/{raceId}/nodes/{nodeId}/protected/meta`
 */
export interface NodeMeta {
  /**
   * The id of the parent node.
   */
  nodeId: string;

  /**
   * The display name for the node.
   */
  name: string;

  /**
   * A description for the node.
   */
  description: string;

  /**
   * The number of tasks in the node.
   */
  numberOfTasks: number;
}

/**
 * Secret meta information about a node, only viewable by managers.
 *
 * Document path: `races/{raceId}/nodes/{nodeId}/protected/secrets`
 */
export interface NodeSecrets {
  /**
   * The id of the parent node.
   */
  nodeId: string;

  /**
   * The code used to unlock the node. All prerequisites must be
   * satisfied before this code can be used.
   */
  code: string;

  /**
   * Notes for race managers regarding this node, used to aid
   * with verifying responses.
   */
  notes: string;

  /**
   * Prerequisite requirements before this node can be unlocked.
   */
  prerequisites: {
    /**
     * A list of required node ids.
     */
    required: string[];
  };
}

/**
 * The `TaskType` determines the type of submission required by the team.
 */
export type TaskType =
  /**
   * Requires a photo submission.
   */
  | "photo"
  /**
   * Requires a text phrase to be submitted.
   */
  | "phrase"
  /**
   * Requires a race manager to assign points.
   */
  | "manual";

/**
 * A task that involves some sort of submission or point allocation in a node.
 *
 * Document path: `races/{raceId}/nodes/{nodeId}/tasks/{taskId}`
 */
export interface Task {
  /**
   * The id of the parent node.
   */
  nodeId: string;

  /**
   * The id for this task.
   */
  taskId: string;

  /**
   * The order which the task should appear in.
   */
  order: string;

  /**
   * The type of task.
   */
  type: TaskType;

  /**
   * A description for the task.
   */
  description: string;
}

export interface ResponseBase<T extends Timestamp> {
  /**
   * The id of the parent node.
   */
  nodeId: string;

  /**
   * The id of the response.
   */
  responseId: string;

  /**
   * The task this response is for.
   */
  taskId: string;

  /**
   * The id of the team that provided the response.
   */
  teamId: string;

  /**
   * The id of the user that provided the response.
   */
  userId: string;

  /**
   * The date which the response was provided.
   */
  date: T;

  /**
   * The type of the response.
   */
  type: TaskType;

  /**
   * The response value.
   */
  value: string;
}

/**
 * A team's response to a task in a node.
 *
 * Document path: `races/{raceId}/nodes/{nodeId}/repsonses/{responseId}`
 */
export interface Response extends ResponseBase<firestore.Timestamp> {}

/**
 * Input for a team's response to a task in a node.
 *
 * Document path: `races/{raceId}/nodes/{nodeId}/repsonses/{responseId}`
 */
export interface ResponseInput extends ResponseBase<Date> {}

export interface ResponseCheckBase<T extends Timestamp> {
  /**
   * The id of the parent node.
   */
  nodeId: string;

  /**
   * The id of the response.
   */
  responseId: string;

  /**
   * The task this response is for.
   */
  taskId: string;

  /**
   * The date this response check was issued.
   */
  date: T;

  /**
   * Whether the response was correct.
   */
  correct: boolean;

  /**
   * Whether the team is allowed to retry the challenge.
   */
  retry: boolean;

  /**
   * The user who checked the response.
   */
  checkedBy: string;

  /**
   * The number of points awarded for the attempt.
   */
  points: number;

  /**
   * Feedback to the players for this response.
   */
  feedback: string;
}

/**
 * A race manager's check of a team's response to a task in a node.
 *
 * Document path: `races/{raceId}/nodes/{nodeId}/checks/{responseId}`
 */
export interface ResponseCheck extends ResponseCheckBase<firestore.Timestamp> {}

/**
 * Input for a race manager's check of a team's response to a task in a node.
 *
 * Document path: `races/{raceId}/nodes/{nodeId}/checks/{responseId}`
 */
export interface ResponseCheckInput extends ResponseCheckBase<Date> {}
