import { faCoffee } from '@fortawesome/fontawesome-free';
export const navData = [

    {
        routeLink: "/admin",
        icon: "bi bi-house",
        label: "Dashboard",
        role: "ADMIN"
    },


    {
        routeLink: "/admin/list_tache",
        icon: "bi bi-list-task",
        label: "A traiter",
        role: "ADMIN"
    },
    {
        routeLink: "/admin/list_reception",
        icon: "bi bi-arrow-repeat",
        label: "Attribution",
        role: "ADMIN"
    },
    {
        routeLink: "/admin/your_liste_traitement",
        icon: "bi bi-check-square",
        label: "Validation",
        role: "ADMIN"
    },

    {
        routeLink: "/admin/facturation",
        icon: "bi bi-receipt",
        label: "Facture",
        role: "ADMIN"
    },
    {
        routeLink: "/admin/utilisateur",
        icon: "bi bi-people",
        label: "Utilisateurs",
        role: "ADMIN"
    },
     //{
      //   routeLink: "/admin/chatMessage",
      //  icon: "bi bi-chat",
      //   label: "Chat",
      //   role: "ADMIN"
    // },
   // {
        //routeLink: "/admin/chatMessage2",
      //  icon: "bi bi-chat",
    //   label: "Chat",
   //     role: "ADMIN"
   //},





];
export const navDatas= [

    {
        routeLink: "/admin/creer_tache",
        icon: "bi bi-plus-square-fill",
        label: "Créer tache",
        role: "CLIENT"
    },
    {
        routeLink: "/admin/taches_client",
        icon: "bi bi-list-task",
        label: "Envoi",
        role: "CLIENT"
    },
    {
        routeLink: "/admin/your_liste_traitement",
        icon: "bi bi-check-square",
        label: "Réception",
        role: "CLIENT"
    },


];
export const navDatass= [
    {
        routeLink: "/admin",
        icon: "bi bi-house",

        label: "Dashboard",
        role: "BACKOFFICE"
    },

    {
        routeLink: "/admin/list_tache",
        icon: "bi bi-check-square",
        label: "A traiter",
        role: "BACKOFFICE"
    },

    {
        routeLink: "/admin/reception_taches_back",
        icon: "bi bi-arrow-repeat",
        label: "Attribution",
        role: "BACKOFFICE"
    },
    {
        routeLink: "/admin/your_liste_traitement",
        icon: "bi bi-check-square",
        label: "Réalisation",
        role: "BACKOFFICE"
    },
   //  {
         //routeLink: "/admin/chatMessage",
         //icon: "bi bi-chat",
       //  label: "Chat",
     //    role: "BACKOFFICE"
   //  },
   // {
   //     routeLink: "/admin/chatMessage2",
  //  icon: "bi bi-chat",
   //    label: "Chat",
    //    role: "BACKOFFICE"
  //  },
];
