interface TaskAttributes {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "doing" | "done";
  createdAt: Date;
  updatedAt: Date;
}

export class Task {
  private static tasks: Task[] = [];
  private static sequence: number = 1;

  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "doing" | "done";
  createdAt: Date;
  updatedAt: Date;

  constructor(attributes: TaskAttributes) {
    this.id = attributes.id;
    this.title = attributes.title;
    this.description = attributes.description;
    this.priority = attributes.priority;
    this.status = attributes.status;
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
  }

  static findAll(): Task[] {
    return this.tasks;
  }

  static findById(id: number): Task | null {
    return this.tasks.find((task) => task.id === id) ?? null;
  }

  static create(
    attributes: Omit<TaskAttributes, "id" | "createdAt" | "updatedAt">
  ): Task {
    const { title, description, status, priority } = attributes;
    const newTask = {
      id: this.sequence++,
      title,
      description,
      status,
      priority,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.tasks.push(newTask);
    return newTask;
  }

  static update(
    id: number,
    attributes: Partial<Omit<TaskAttributes, "id" | "createdAt" | "updatedAt">>
  ): Task | null {
    const { title, description, priority, status } = attributes;

    const task = this.findById(id);

    if (!task) return null;

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    task.updatedAt = new Date();

    return task;
  }

  static delete(id: number): Task | null {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (!this.tasks[index]) return null;
    return this.tasks.splice(index, 1)[0];
  }
}
