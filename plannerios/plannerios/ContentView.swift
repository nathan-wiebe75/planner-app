//
//  ContentView.swift
//  plannerios
//
//  Created by Nathan Wiebe on 9/1/26.
//

import SwiftUI

struct ContentView: View {
    private let assignments: [Assignment] = [
        Assignment(id: 1,name: "Intro to Algorithms HW 1", course: "CS 201 - Algorithms"),
        Assignment(id: 2,name: "Build a CPU Simulator", course: "CS 301 - Computer Architecture"),
        Assignment(id: 3, name: "Neural Network Mini-Project", course: "CS 450 - Machine Learning"),
        Assignment(id: 4, name: "Compiler Lexer/Parser", course: "CS 410 - Compilers"),
        Assignment(id: 5, name: "Distributed Systems Lab", course: "CS 425 - Distributed Systems")
    ]
    var body: some View {
        VStack {
            Text("Assignments")
                .font(.largeTitle)
                .bold()
            ForEach(assignments.indices, id: \.self) { index in
                assignments[index]
            }
            Spacer()
        }
        .padding()
        .foregroundStyle(.white)
        .appBackground()
    }
}


#Preview {
    ContentView()
}
