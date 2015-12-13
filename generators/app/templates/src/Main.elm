
import <%= rootComponentName %>

import StartApp
import Task
import Effects
import Html

app : StartApp.App <%= rootComponentName %>.Model
app =
  StartApp.start
    { view = <%= rootComponentName %>.view
    , update = <%= rootComponentName %>.update
    , init = <%= rootComponentName %>.init
    , inputs = []
    }

main : Signal Html.Html
main =
  app.html

port tasks : Signal (Task.Task Effects.Never ())
port tasks =
  app.tasks
