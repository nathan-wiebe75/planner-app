//
//  ContentView.swift
//  plannerios
//
//  Created by Nathan Wiebe on 9/1/26.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
            VStack {
                Text("Assignments")
                    .font(.largeTitle)
                Assignment(name: "Assignment 1", course: "Computer Architecture")
                Spacer()
            }
    }
}


#Preview {
    ContentView()
        .frame(maxHeight:.infinity)
        .background(Color.blue)
        .foregroundStyle(Color.white)
}
