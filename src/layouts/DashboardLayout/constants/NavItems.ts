export const NAV_ITEMS_BY_ROLE = {
  ADMIN: [
    { label: "Add User", to: "addUser" },
    { label: "Courses", to: "courses" },
    { label: "Students", to: "students" }
  ],
  STUDENT: [
    { label: "Courses", to: "courses" },
    { label: "My Courses", to: "me/courses" }
  ],
  INSTRUCTOR: [
    { label: "Courses", to: "courses" },
  ]
}