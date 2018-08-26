module Main exposing (..)

import Html.Events as Events
import Html exposing (Html)
import Html.Attributes


-- MODEL


type alias Model =
    { counter : Int }


init : ( Model, Cmd Msg )
init =
    ( { counter = 99 }
    , Cmd.none
    )



-- UPDATE


type Msg
    = NoOp
    | Increment


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        Increment ->
            ( { model | counter = model.counter + 1 }, Cmd.none )



-- VIEW


view : Model -> Html Msg
view model =
    Html.div
        []
        [ Html.img
            [ Html.Attributes.src "/img/elm.png"
            , Html.Attributes.style [ ( "border", "1px solid black" ) ]
            ]
            []
        , Html.text " Hello world"
        , Html.button
            [ Events.onClick Increment ]
            [ Html.text ("Increment " ++ toString model.counter) ]
        ]



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }
