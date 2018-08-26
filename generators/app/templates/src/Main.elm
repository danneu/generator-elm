module Main exposing (..)

import Browser
import Html exposing (Html, div, img, text)
import Html.Attributes as Attr


-- MODEL


type alias Model =
    {}


type alias Flags =
    {}

init : Flags -> ( Model, Cmd Msg )
init flags =
    ( {}
    , Cmd.none
    )



-- UPDATE


type Msg
    = NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )



-- VIEW


view : Model -> Html Msg
view model =
    div
        []
        [ img
            [ Attr.src "/img/elm.png"
            , Attr.style  "border" "1px solid black" 
            ]
            []
        , text "Hello world"
        ]



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }
