import { FiUsers, FiList, FiSettings, FiFile, FiTrello } from "react-icons/fi";

const sections = {
  Inicio: [
    {
      text: "General",
      path: "/dashboard",
      icon: FiTrello,
    },
  ],

  Usuarios: {
    rank: "admin",
    options: [
      {
        text: "Usuarios",
        path: "/users",
        icon: FiUsers,
      },
      {
        text: "Roles",
        path: "/roles",
        icon: FiList,
      },
    ],
  },

  Administración: [
    {
      text: "Gestión",
      path: "/management",
      icon: FiSettings,
    },
    {
      text: "Respaldo",
      path: "/backup",
      icon: FiFile,
    },
  ],
};

export default sections;
