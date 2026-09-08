//
//  ContentView.swift
//  plannerios
//
//  Created by Nathan Wiebe on 9/1/26.
//

import SwiftUI

struct ContentView: View {
    private let assignments: [Assignment] = [
        Assignment(id: 1,name: "Intro to Algorithms HW 1", course: "CS 201 - Algorithms", dueDate: Calendar.current.date(from: DateComponents(year: 2026, month: 9, day: 15))!, priority: Priority.medium),
        Assignment(id: 2,name: "Build a CPU Simulator", course: "CS 301 - Computer Architecture", dueDate: Calendar.current.date(from: DateComponents(year: 2026, month: 9, day: 22))!, priority: .low),
        Assignment(id: 3, name: "Neural Network Mini-Project", course: "CS 450 - Machine Learning", dueDate: Calendar.current.date(from: DateComponents(year: 2026, month: 9, day: 29))!, priority: .medium),
        Assignment(id: 4, name: "Compiler Lexer/Parser", course: "CS 410 - Compilers", dueDate: Calendar.current.date(from: DateComponents(year: 2026, month: 10, day: 6))!, priority: Priority.high),
        Assignment(id: 5, name: "Distributed Systems Lab", course: "CS 425 - Distributed Systems", dueDate: Calendar.current.date(from: DateComponents(year: 2026, month: 10, day: 13))!, priority: .high)
    ]
    var body: some View {
        VStack {

            HStack {
                Button { } label: {
                    Image(systemName: "line.horizontal.3")
                        .font(.headline)
                        .frame(width: 24, height: 24)
                        .padding(8)
                        .background {
                            RoundedRectangle(cornerRadius: 8)
                                .foregroundStyle(.tint)
                                .opacity(0.25)
                                .brightness(-0.4)
                        }
                }

                Spacer(minLength: 0)

                Text("Assignments")
                    .font(.title2)
                    .bold()
                    .lineLimit(1)
                    .truncationMode(.tail)

                Spacer(minLength: 0)

                Button { } label: {
                    Image(systemName: "plus")
                        .font(.headline)
                        .frame(width: 24, height: 24)
                        .padding(8)
                        .background {
                            RoundedRectangle(cornerRadius: 8)
                                .foregroundStyle(.tint)
                                .opacity(0.25)
                                .brightness(-0.4)
                        }
                }
            }
            .frame(maxWidth: .infinity)
            .padding(.horizontal, 20)
            .padding(.top, 4)
            .padding(.bottom, 8)

            ForEach(assignments.indices, id: \.self) { index in
                assignments[index]
            }
            Spacer()
        }
        .padding(.horizontal)
        .padding(.top, 4)
        .foregroundStyle(.white)
        .appBackground()
    }
}


#Preview {
    ContentView()
}

