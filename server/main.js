import { Meteor } from "meteor/meteor"
import "/imports/api/dynamic_pages/server/methods"
import "/imports/api/dynamic_pages/server/publication"
import "/imports/api/comments/server/methods"
import "/imports/api/comments/server/publication"
import "/imports/api/accounts/server/methods"

Meteor.startup(() => {
  const first_user = Meteor.users.findOne()
  if (!first_user) {
    console.log("CRÉATION D'UN PREMIER UTILISATEUR")
    const user_id = Accounts.createUser({
      email: "jimmy@yopmail.com",
      password: "changeme",
      username: "admin"
    })

    Roles.addUsersToRoles(user_id, "admin")
  }
})
