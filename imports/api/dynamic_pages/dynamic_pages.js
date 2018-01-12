import { Mongo } from "meteor/mongo"

export const DynamicPages = new Mongo.Collection("dynamic_pages")

const DynamicPagesSchema = new SimpleSchema({
  title: {
    type: String,
    label: "Titre"
  },
  description: {
    type: String,
    optional: true
  },
  content: {
    type: String,
    optional: true
  },
  image_url: {
    type: String,
    optional: true
  },
  active: {
    type: Boolean,
    defaultValue: true
  },
  created_at: {
    type: Date
  }
})

DynamicPages.attachSchema(DynamicPagesSchema)
