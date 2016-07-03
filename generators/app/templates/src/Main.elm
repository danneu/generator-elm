
module Main exposing (..)

-- Elm Core
import Html exposing (..)
import Html.App
import Html.Attributes exposing (..)
import Html.Events exposing (..)


-- MODEL


type alias Model =
  {
  }


init : (Model, Cmd Msg)
init =
  ( {
    }
  , Cmd.none
  )


-- UPDATE


type Msg
  = NoOp


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    NoOp ->
      (model, Cmd.none)


-- VIEW


view : Model -> Html Msg
view model =
<% if (bootstrap) { -%>
  div
  [ class "container" ]
  [ p
    []
    [ text "Hello world" ]
  ]
<% } else { -%>
  div
  []
  [ text "Hello world" ]
<% } -%>


-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none


main : Program Never
main =
  Html.App.program
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }
