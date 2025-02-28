require 'rails_helper'

RSpec.describe "Notes API", type: :request do
  let(:user) { User.create!(email: "test@example.com", password: "password", name: "bobby barfuss test") }
  let(:token) { ApplicationController.new.generate_token(user.id) }
  let(:headers) { { "Authorization" => "Bearer #{token}" } }

  describe "POST /notes" do
    it "creates a new note and returns it" do
      note_params = {
        note: {
          title: "Test Note",
          content: "This is a test note.",
          user_id: user.id
        }
      }

      post "/notes", params: note_params, headers: headers

      expect(response).to have_http_status(:created)
      json_response = JSON.parse(response.body)
      expect(json_response["title"]).to eq("Test Note")
      expect(json_response["content"]).to eq("This is a test note.")
      expect(Note.last.title).to eq("Test Note")
    end
  end
end