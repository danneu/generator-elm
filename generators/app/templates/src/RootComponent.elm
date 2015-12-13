
module <%= rootComponentName %> where

import Effects exposing (Effects)
import Html exposing (..)

-- MODEL

type alias Model =
  {
  }

init : (Model, Effects Action)
init =
  ({}, Effects.none)

-- UPDATE

type Action
  = NoOp

update : Action -> Model -> (Model, Effects Action)
update action model =
  case action of
    NoOp ->
      (model, Effects.none)

-- VIEW

view : Signal.Address Action -> Model -> Html
view address model =
  div
  []
  [ text "Hello, world!"
  ]

(=>) : a -> b -> (a, b)
(=>) = (,)
